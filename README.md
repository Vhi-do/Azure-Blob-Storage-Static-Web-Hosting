##### Azure Blob Storage Static Web Hosting Learning Program

###### Project Overview
This project focuses on hosting a static website using Azure Blob Storage, a cost-effective and highly scalable alternative to traditional web server management. The goal was to explore the benefits of serverless architectures for front-end applications, such as portfolios and landing pages.

###### Technologies Used
- Microsoft Azure Portal
- Azure CLI
- Azure Blob Storage
- Azure Static Website Hosting

###### Implementation Steps

###### 1. Provision Storage Account
A new Azure Storage Account was created using the Azure CLI with `Standard_LRS` redundancy.

**BASH**

```

az storage account create \
    --resource-group rg-storage-learning \
    --name vhidostaticwebsitedemo \
    --sku Standard_LRS \
    --kind StorageV2 \
    --location westus2 

```

###### 2. Enable Static Website Hosting

The static website feature was enabled, which automatically creates the `$web` container and generates the public endpoint.

**BASH**

```

az storage blob service-properties update \
--account-name vhidostaticwebsitedemo \
--static-website \
--index-document index.html \
--404-document 404.html

```

###### 3. Configure RBAC Permissions

The `Storage Blob Data Contributor` role was assigned to the user account to allow file uploads to the `$web` container.

###### 4. Upload Website Assets

`index.html` and `404.html` files were created locally and uploaded directly to the `$web` container using Azure CLI.

**BASH**

```

az storage blob upload \
--account-name vhidostaticwebsitedemo \
--container-name $web \
--name index.html \
--file index.html \
--auth-mode login 

```

###### 5. Verify Deployment

The website was successfully accessed via the Azure primary endpoint.

- **Live URL:** https://vhidostaticwebsitedemo.z5.web.core.windows.net/

###### 6. Security & Scalability

Storage account access levels were reviewed, and the solution is scalable via Azure CDN integration if needed.

###### Cleanup

To avoid incurring costs, the resource group can would be deleted using:

> az group delete --name rg-storage-learning --yes --no-wait