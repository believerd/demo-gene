# Demo Gene Database

## Overview
Simple demo website with sidebar on the left showing all genes, a search bar on top and the detail page on the right.

Since the purpose is to show the data without any change to it, it makes sense to use this documentation-like layout.


All data fetching is using React Router Loader which can be easily translated to whatever backend service that's been using without the need to change the frontend.
(Frontend is immutable to the backend)

Detail page on the right shows basic information for the specific gene and also with a histogram showing the location for its effectiveness among all genes.

## Future development
- Finetune search function with the ability to filter out the results based on effective or other attributes.
- Integrate histogram to search so that we can select the range we want.
- Finetune detail page based on needs.
- High availability with kubernetes.
