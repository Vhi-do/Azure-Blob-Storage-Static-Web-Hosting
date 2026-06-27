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


###### 6. Project Enhancements & Folder Organization

After the initial deployment, the project was enhanced by organizing the website assets into a professional directory structure.

**Local Directory Structure:**

```
/home/vhido/Azure Blob Storage Static Web Hosting   (Project Root)
├── index.html
├── 404.html
├── assets/
├── css/
├── js/
└── deploy/       (Clean deployment folder)
```

###### 7. Batch Upload & Overwrite Strategy

To streamline updates and avoid uploading development files (like `.git` or `README.md`), a dedicated `deploy` folder was created containing only the web files.

The following command was used to upload the entire folder structure to the `$web` container, with the `--overwrite` flag to ensure existing blobs were updated:

**BASH**

```

az storage blob upload-batch \
    --account-name vhidostaticwebsitedemo
    --destination $web
    --source ./deploy
    --overwrite
    --auth-mode login

```

###### 8. Advanced Features Implementation (CDN Integration)

To improve global content delivery and reduce latency, an Azure CDN profile was configured to cache and accelerate the static website content.

- CDN Endpoint: vhido-endpoint.azureedge.net

```

az afd profile create \
  --resource-group rg-storage-learning \
  --profile-name vhido-frontdoor \
  --sku Standard_AzureFrontDoor

```

```

az afd endpoint create 
--resource-group rg-storage-learning \
--profile-name vhido-cdn-profile \
--name vhido-endpoint \
--origin vhidostaticwebsitedemo.z5.web.core.windows.net \
--origin-host-header vhidostaticwebsitedemo.z5.web.core.windows.net

```

###### 10. Advanced Features: CDN Integration RESTRICTION (Azure Front Door)

Due to the limitations of the Azure Free Trial subscription, the full deployment of Azure Front Door (Standard SKU) was restricted by Microsoft's policy. While the configuration commands (`az afd profile create`) were executed, the service returned a `Free Trial and Student account is forbidden` error.

**Workaround & Learning Outcome:**
This limitation provided valuable insight into Azure's tiered pricing models and global networking constraints. As an alternative to a globally distributed CDN for this project, the site utilizes Azure Blob Storage's built-in global edge caching capabilities which still provide excellent performance for static content at no additional cost. 

For production environments, migrating to a Pay-As-You-Go subscription would unlock the full Azure Front Door suite.

###### 11. Verification & 404 Validation

The deployment was verified by accessing the live URL. The website was tested using Google Lighthouse to evaluate its performance metrics. Additionally, the custom error page was successfully validated by navigating to a non-existent page path.

- **Live URL:** https://vhidostaticwebsitedemo.z5.web.core.windows.net/
- **Custom 404 Test:** https://vhidostaticwebsitedemo.z5.web.core.windows.net/vhido

###### 12. Cleanup

To avoid incurring costs, the resource group can would be deleted using:

> az group delete --name rg-storage-learning --yes --no-wait

*Note: Custom domain mapping was explored and understood. Due to the free tier limitation of Azure Front Door, custom domain configuration was not implemented. This would typically involve adding a CNAME record at a domain registrar and enabling Azure-managed SSL certificates.*