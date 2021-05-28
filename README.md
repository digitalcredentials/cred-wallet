# Welcome to CredWallet!

# React Native ^0.63.2 with TypeScript Project!

CredWallet is an open source wallet project that implements the standards developed by the Digital Credentials Consortium, a network of higher education institutions. The wallet allows the exchange, storage, and management of education certificates. The reference implementation is developed in React Native. 


The target platforms: Android, iOS.

# Install

Install requirements: see [react-native instruction](https://reactnative.dev/docs/environment-setup) for setting up the required environment.

```sh
git clone <ssh/https_git_url>
cd <your_project_name>
yarn
cd ios
pod install
```

Create empty config files:

```
touch app/config/env.dev.js
touch app/config/env.prod.js

```

# Run

## Auto

```sh
react-native run-android
OR
react-native run-ios
```

## Manual

## Android manual

Start server:

```sh
yarn start --reset-cache
```

1. Open project with Android Studio (android directory)
2. Run emulator
3. 'Run' button

## IOS manual

1. Open project with xCode
2. Switch to Any iOS device
3. Choose Product -> Archive
4. Press Deploy when it would be active
5. Follow steps

# Deploy

## Android

Clear the cache and start a release build:

```sh
cd android
./gradlew clean
./gradlew app:assembleRelease
```

The APK destination by default:
root/android/app/build/outputs/apk/release/app-release.apk

## iOS

Enter these commands and follow instructions:

```sh
cd ios
fastlane
```
