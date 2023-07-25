---
title: 'Supabase Registration Deep Linking with React Native'
slug: 'deep-Linking-react-native'
date: '2021-06-09'
description: 'Learn how to query the Github GraphQl API to make a clone of the github user profile repositories page...'
image: 'https://res.cloudinary.com/cortehz/image/upload/v1671086836/blog_images/main-image/graphQl.webp'
tags: ['javascript']
---

- Define config object. Object contains prefixes with URI schemes. Opening the app based on this

```
const linking = {
  prefixes: ['yourapp://']
};
```

add linking to navigation container

```
		<NavigationContainer linking={linking}>
...
		</NavigationContainer>

```

Use the uri-scheme package to create a uri scheme for the app

```

# for iOS
npx uri-scheme add peoplesapp --ios

# for Android
npx uri-scheme add peoplesapp --android

```
