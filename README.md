# ARM Templates Service Catalog 

This repository contains the pre-approved Azure Resource Manager architectures that can be consumed when creating new services. These 
templates provide a consistent deployment model for infrastructure that is needed to operate a service. Each template includes these features for 
continuity across all services created by the organization:

- **High Availability** - Each service should be deployed to multiple regions to prevent a single point of failure
- **Traffic Routing** - Services shall have DNS level traffic routing that will perform healthchecks on each region to prevent sending traffic to a service that is not fully functional
- **Database Replication** - Data should be replicated to another region for disaster recovery
- **Governance Tagging** - All resources should have tags applied that aid in governance, auditing and cost attribution
- **Alerting/Monitoring** - Alerts for key service metrics are included like High CPU Usage, HTTP 500 Errors, etc. 
- **Slot Deployment** - WebApps come with deployments slots built in for easier roll outs when being deployed
- **T-Shirt Sizing** - Infrastructure horizontally scales by providing changes in a few simple variables. This allows scaling up and escalating through environments to be easy and maintain continuity.

---

## Available Templates 

Below is a detailed description of what is contained within each template as well as diagrams and examples of parameters to include. There are 
example repos and boilerplate projects to showcase more of this as well. 

- [Load Balanced WebApps](/docs/webapps.md)
- [WebApps + Azure SQL](./docs/webapps-sql.md)
- [WebApps + DocDB](./docs/webapps-docdb.md)

---

## Important Resources 

Below are some resources that will help in researching and understanding more in-depth concepts surrounding the templating process for Azure Resource Manager

- [Authoring Azure Resource Manager Templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates)
- [Creating A T-Shirt Size ARM Template](https://pgroene.wordpress.com/2016/09/06/creating-a-t-shirt-size-arm-template/)

---

## Using Parameter Files In Services 

Below is an example parameters file that would be placed in your service code repository. **It is recommended** to create a parameters file for each environment. 
This allows scaling and slight changes to be passed per release pipeline. For instance you may have 4 parameters files in your service name `params.dev.json`, `params.stage.json`,
`params.test.json` and `params.prod.json`. These will be referenced in the different release pipelines when escalating to different environments.

```
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "buildID": {
            "value": "boilerplate"
        },
        "deploymentSize": {
            "value": "Dev"
        },
        "serverRegions": {
            "value": [
                "East US",
                "West US 2"
            ]
        },
        "sqlAdministratorLogin": {
            "value": "psgadmin"
        },
        "sqlAdministratorLoginPassword": {
            "reference": {
                "keyVault": {
                    "id": "[concat(subscription().id, resourceGroup().id, /providers/Microsoft.KeyVault/vaults/psg-cp-dev-arm-keyvault)]"
                },
                "secretName": "demoApi-sqlAdminPassword"
            }
        },
        "sqlDatabaseName": {
            "value": "boilerplate"
        },
        "tags": {
            "value": {
                "businessUnit": "PSG",
                "capability": "CP",
                "costCenter": "PSG",
                "createdBy": "person@absg.com",
                "owner": "person@absg.com"
            }
        }
    }
}
```