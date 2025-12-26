---
name: Système de retry WhatsApp avec suivi
overview: Ajouter un système de retry automatique pour l'envoi WhatsApp avec suivi du statut de notification dans la base de données, incluant une seconde tentative après 30 secondes en cas d'échec initial.
todos: []
---

#Système de retry WhatsApp avec suivi

## Objectif

Implémenter un système de retry automatique pour l'envoi WhatsApp : si la première tentative échoue, réessayer une seule fois après 30 secondes, avec suivi du statut dans la base de données.

## Fichiers à modifier

### 1. `/lib/db.js` - Extension de la table leads et nouvelles fonctions

**Modifier `initDatabase()` :**

- Ajouter les colonnes à la table `leads` :
```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_status VARCHAR(30) DEFAULT 'pending';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_attempts INTEGER DEFAULT 0;
```


**Note :** Utiliser `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` pour éviter les erreurs si les colonnes existent déjà.**Ajouter fonction `updateNotificationStatus(lead_id, status, attempts)` :**

```javascript
export async function updateNotificationStatus(lead_id, status, attempts) {
  // UPDATE leads
  // SET notification_status = $1, notification_attempts = $2
  // WHERE id = $3
  // Retourner result.rowCount > 0
}
```



### 2. `/api/confirm.js` - Logique de retry

**Modifier la section d'envoi WhatsApp (après attribution réussie) :**

1. **Tentative n°1 (immédiate) :**

- Appeler `sendWhatsAppMessage()` dans un try/catch
- Si succès :
    - `await updateNotificationStatus(lead.id, 'whatsapp_sent', 1)`
    - Logger le succès
    - FIN (pas de retry)
- Si échec :
    - `await updateNotificationStatus(lead.id, 'pending', 1)`
    - Logger l'erreur de la tentative 1
    - Programmer la tentative 2 avec `setTimeout`

2. **Tentative n°2 (après 30 secondes) :**

- Dans le `setTimeout`, créer une fonction async
- Réappeler `sendWhatsAppMessage()` dans un try/catch
- Si succès :
    - `await updateNotificationStatus(lead.id, 'whatsapp_sent', 2)`
    - Logger le succès de la tentative 2
- Si échec :
    - `await updateNotificationStatus(lead.id, 'whatsapp_failed', 2)`
    - Logger l'échec définitif

**Important :**

- Le `setTimeout` ne doit PAS bloquer la réponse HTTP
- La réponse HTML de confirmation est retournée immédiatement
- Le retry s'exécute en arrière-plan

### 3. Gestion d'erreurs robuste

**Règles strictes :**

- Tous les appels WhatsApp dans try/catch
- Tous les appels DB dans try/catch
- Aucune exception ne doit casser la confirmation
- Le client reste attribué quoi qu'il arrive
- Maximum 2 tentatives (vérifier `notification_attempts` avant retry)

**Logs clairs :**

- `✅ WhatsApp envoyé (tentative 1) - Lead ${lead.id}`
- `⚠️ Échec WhatsApp tentative 1 - Lead ${lead.id} - Retry dans 30s`
- `✅ WhatsApp envoyé (tentative 2) - Lead ${lead.id}`
- `❌ Échec définitif WhatsApp (tentative 2) - Lead ${lead.id}`

### 4. Structure du code

**Dans `/api/confirm.js`, après `assignLeadToPlumberAtomically` :**

```javascript
if (assigned) {
  // ... log attribution ...
  
  // Tentative 1 : Envoi WhatsApp immédiat
  try {
    const whatsappMessage = `...`
    await sendWhatsAppMessage({
      to: selectedPlumber.phone,
      message: whatsappMessage
    })
    // Succès tentative 1
    await updateNotificationStatus(lead.id, 'whatsapp_sent', 1)
    console.log('✅ WhatsApp envoyé (tentative 1) - Lead', lead.id)
  } catch (whatsappError) {
    // Échec tentative 1
    await updateNotificationStatus(lead.id, 'pending', 1)
    console.warn('⚠️ Échec WhatsApp tentative 1 - Lead', lead.id, '- Retry dans 30s:', whatsappError.message)
    
    // Programmer tentative 2 après 30 secondes
    setTimeout(async () => {
      try {
        const whatsappMessage = `...` // Même message
        await sendWhatsAppMessage({
          to: selectedPlumber.phone,
          message: whatsappMessage
        })
        // Succès tentative 2
        await updateNotificationStatus(lead.id, 'whatsapp_sent', 2)
        console.log('✅ WhatsApp envoyé (tentative 2) - Lead', lead.id)
      } catch (retryError) {
        // Échec définitif
        await updateNotificationStatus(lead.id, 'whatsapp_failed', 2)
        console.error('❌ Échec définitif WhatsApp (tentative 2) - Lead', lead.id, ':', retryError.message)
      }
    }, 30000) // 30 secondes
  }
}
```



### 5. Migration de la base de données

**Approche :**

- Utiliser `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` dans `initDatabase()`
- Compatible avec les bases existantes
- Pas besoin de migration séparée

## Ordre d'exécution

1. Modifier `initDatabase()` pour ajouter les colonnes `notification_status` et `notification_attempts`
2. Ajouter fonction `updateNotificationStatus()` dans `/lib/db.js`
3. Modifier `/api/confirm.js` pour implémenter la logique de retry
4. Tester avec un envoi qui échoue pour vérifier le retry

## Résultat attendu

- Colonnes de suivi ajoutées à la table `leads`
- Tentative 1 immédiate après attribution
- Retry automatique après 30 secondes si échec
- Maximum 2 tentatives respecté