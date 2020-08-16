import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, View, ImageStyle, Linking, StyleSheet } from "react-native"
import { Screen, Text, Button, Header, Wallpaper, BottomLogo } from "../../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { useStores } from "../../models/root-store"
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { getVC, GetVCResult } from "../../services/credentials"
import { Credential } from "../../models/credential/credential-model"
import parse from "../../utils/parse"

export interface QrScreenProps extends NavigationScreenProps<{}> {
}


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "space-around",
  alignItems: "center"
}
const INNER_CONTAINER: ViewStyle = {
  width: 400,
  height: 600
}
const IMAGE_STYLE: ImageStyle = {
  flex: 1,
  height: undefined,
  width: undefined
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginBottom: 10,
  width: 300
}
export const QrScreen: React.FunctionComponent<QrScreenProps> = observer((props) => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  // const goHome = () => props.navigation.navigate("main")
  const { credential } = useStores()

  const deleteCred = () => {
    credential.removeMe()
    goBack()
  }

  const showDetails = async () => {
    // rootStore.credential.remove()
    // goHome()

    /*
    const { addCredential } = useStores()

    const didArg = {subjectDid: "did:example:123"};
    const response = await fetch('http://127.0.0.1:5000/request/credentials', {
      method: 'POST',
      body: JSON.stringify(didArg),
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      }
    })
    const credential = await response.json()
    const vc = parse(credential)
    addCredential(vc)*/

  }

  const onSuccess = async (e) => {
    const url = e.data;
    console.log(url);

    try {
      const { addCredential } = useStores()

      const didArg = { subjectDid: "did:example:123" };
      const response = await fetch('https://sign-and-verify.herokuapp.com/request/credentials', {
        method: 'POST',
        body: JSON.stringify(didArg),
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        }
      })
      const credential = await response.json()
      const vc = parse(credential)
      addCredential(vc)
    } catch (err) {
      console.error(err)
    } finally {
      goBack()
    }
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header
        headerTx="credScreen.title"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View style={CONTAINER}>
        <Text preset="header" text={credential ? credential.name : 'No credential selected'} />
        <QRCodeScanner
        onRead={onSuccess}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
        <View>
          <Button style={BUTTON} text="Show Details" onPress={showDetails}/>
        </View>
      </View>
      <BottomLogo/>
    </Screen>
  )
})

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});