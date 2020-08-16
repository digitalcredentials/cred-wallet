import * as React from "react"
import DocumentPicker from "react-native-document-picker"
import RNFS from "react-native-fs"
import parse from "../../utils/parse"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ActivityIndicator } from "react-native"
import { Screen, Header, TextField, Button, Wallpaper, Text, BottomLogo } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { getVC } from "../../services/credentials"
import { Credential } from "../../models/credential/credential-model"

// import { showAllKeys } from "../../utils/storage"
// const uuidv1 = require('uuid/v1');

export interface ImportScreenProps extends NavigationScreenProps<{}> {
}

const FORM: ViewStyle = {
  // backgroundColor: '#455a64',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const BOLD: TextStyle = { fontWeight: "bold" }

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

const URL_INPUT: TextStyle = {
  backgroundColor: 'rgba(255,255,255,0.3)',
  color: '#ffffff',
  borderRadius: 25,
  paddingHorizontal: 16,
  fontSize: 16,
  marginVertical: 10,
  width: 300
}

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginVertical: spacing[2],
  width: 300,
}

const BUTTON_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2
}
const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const ImportScreen: React.FunctionComponent<ImportScreenProps> = observer((props) => {
  const { addCredential } = useStores()
  const goHome = () => props.navigation.navigate("main")

  const [url, setURL] = React.useState('')
  const [fetchingCred, setFetchingCred] = React.useState(false)

  const importVCSample = async () => {
    setFetchingCred(true)

    const credResult = await getVC('https://gitlab.com/jc.chartrand/vctest/-/raw/master/vc-test.json') as any // hack to get rid of typescript error on next line - frustrating
    const vc: Credential = credResult.vc
    addCredential(vc)

    setFetchingCred(false)
    goHome()
  }

  const importVCTunnelSample = async () => {
    setFetchingCred(true)

    const credResult = await getVC('https://gitlab.com/jc.chartrand/vctest/-/raw/master/tunnel-vc-test.json') as any // hack to get rid of typescript error on next line - frustrating
    const vc: Credential = credResult.vc
    addCredential(vc)

    setFetchingCred(false)
    goHome()
  }

  const importVC = async () => {
    setFetchingCred(true)

    const credResult = await getVC(url) as any // hack to get rid of typescript error on next line - frustrating
    const vc: Credential = credResult.vc
    addCredential(vc)

    setFetchingCred(false)
    goHome()
  }

  const importFile = async () => {
    setFetchingCred(true)

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      })
      const credText = await RNFS.readFile(res.uri, 'utf8')
      const cred = JSON.parse(credText)
      const vc = parse(cred)
      addCredential(vc)
    } catch (err) {
      setFetchingCred(false)
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
    setFetchingCred(false)
    goHome()
  }

  const Fetching = () => {
    if (fetchingCred) {
      return <View>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text preset="header">Hang on, we're getting your credential.</Text>
      </View>
    }
    return null
  }

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>

        <Header
          headerTx="importScreen.title"
          leftIcon="back"
          onLeftPress={goHome}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <Fetching/>

        <View style={FORM}>

          <TextField
            placeholderTx="importScreen.urlPlaceholder"
            onChangeText={(text) => setURL(text)}
            value={url}
            inputStyle={URL_INPUT}

          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            tx="importScreen.submitButton"
            onPress={importVC}
            disabled = {fetchingCred}
          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            tx="importScreen.sampleButton"
            onPress={importVCSample}
            disabled = {fetchingCred}
          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            tx="importScreen.tunnelSampleButton"
            onPress={importVCTunnelSample}
            disabled = {fetchingCred}
          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            tx="importScreen.fileButton"
            onPress={importFile}
            disabled = {fetchingCred}
          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            tx="importScreen.qrButton"
            onPress={() => props.navigation.navigate("qr")}
            disabled = {fetchingCred}
          />
        </View>

        <BottomLogo/>
      </Screen>
    </View>

  )
})
