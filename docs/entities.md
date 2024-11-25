# Entities

## User

| **Attribute** | **Type** | **Description** |
| - | - | - |
| **id** | (UUID) | `Unique identifier for the user` |
| **name** | String | `Full name of the user` |
| **email** | String | `Unique email address for the user` |
| **password** | (HASH) | `Encrypted password for the user` |

## Project

| **Attribute** | **Type** | **Description** |
| - | - | - |
| **id** | (UUID) | `Unique identifier for the project` |
| **name** | String | `Name of the project (e.g., "Christmas Campaign")` |
| **description** | String | `Detailed description of the project` |
| **user_id** | (UUID) | `Identifier of the user who created or owns the project` |
