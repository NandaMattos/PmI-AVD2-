import { View, SafeAreaView, Platform, Text, Alert } from 'react-native'
import { Button } from '../../components/Buttons'
import { Input } from '../../components/Input'
import { useState } from 'react'
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Masks, createNumberMask } from 'react-native-mask-input';

interface ICadastros {
  nome: string;
  cpf: string;
  siglaCidade: string;
  valorPassagem: string;
  diasTrabalhar: string;
}

export function Home() {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [siglaCidade, setSiglaCidade] = useState("")
  const [valorPassagem, setValorPassagem] = useState("")
  const [diasTrabalhar, setDiasTrabalhar] = useState("")
  const [cadastros, setCadastros] = useState<ICadastros[]>([])

  function handleSiglaCidade() {
    if (!siglaCidade) return;

    if (!["BM", "VR", "R", "BP"].includes(siglaCidade)) {
      setSiglaCidade("")
      Alert.alert("Sigla da Cidade errada", "Forneça: BM, VR, R ou BP")
      return false
    }
    return true
  }
  function handleValorPassagem() {
    if (!valorPassagem) return;
    let valorToNum = Number(valorPassagem.replace(",", "."))
    if (isNaN(valorToNum)) {
      setValorPassagem("")
      Alert.alert("Valor da Passagem errada", "Você não forneceu um número")
      return false;
    }
    if (valorToNum < 4 || valorToNum > 10) {
      setValorPassagem("")
      Alert.alert("Valor da Passagem errada", "Fornaça um valor entre 4 e 10")
      return false;
    }

    setValorPassagem(valorToNum.toString())
    return true
  }
  function handleDiasTrabalhar() {
    if (!diasTrabalhar) return;

    if (diasTrabalhar.includes(".") || diasTrabalhar.includes(",")) {
      setDiasTrabalhar("")
      Alert.alert("Dias a Trabalhar errado", "Você deve fornecer um número inteiro!")
      return false;
    }
    return true
  }
  function handleCpf() {
    if (!cpf) return;
    console.log(cpf)
    console.log(cpf.length)

    if (cpf.length != 14) {
      setCpf("")
      Alert.alert("Cpf errado", "Você deve fornecer um cpf correto!")
      return false;
    }
    return true
  }
  function handleCadastro() {
    Keyboard.dismiss()
    if (!nome || !cpf || !siglaCidade || !valorPassagem || !diasTrabalhar) return Alert.alert("Erro ao cadastrar", "Você deve preencher todos os campos corretamente!")

    if (!handleCpf()) return;
    if (!handleSiglaCidade()) return;
    if (!handleValorPassagem()) return;
    if (!handleDiasTrabalhar()) return;




    setCadastros([...cadastros, { nome, cpf, siglaCidade, valorPassagem, diasTrabalhar }])

    Alert.alert("Dados Cadastrados",
      `Nome: ${nome}
CPF: ${cpf}
Sigla da Cidade: ${siglaCidade} (${parseSigla(siglaCidade)})
Valor da Passagem: ${valorPassagem}
Dias a Trabalhar: ${diasTrabalhar}
Valor do Cartão: ${Number(valorPassagem) * Number(diasTrabalhar)}
`)

  }
  function parseSigla(sigla: string) {
    if (sigla == "BM") return "Barra Mansa"
    if (sigla == "VR") return "Volta Redonda"
    if (sigla == "R") return "Resende"
    if (sigla == "BP") return "Barra do Piraí"
  }
  function handleTotais() {
    let valorPorCidade: any[] = []

    cadastros.forEach(c => {
      let valor = Number(c.diasTrabalhar) * Number(c.valorPassagem)
      let findCidade = valorPorCidade.find(m => m.cidade == c.siglaCidade)

      if (findCidade)
        findCidade.valor += valor
      else
        valorPorCidade.push({ cidade: c.siglaCidade, valor })
    })

    Alert.alert("TOTAIS", `${valorPorCidade.map(m => `${m.cidade} (${parseSigla(m.cidade)}) - ${m.valor}`).join("\n")}`)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#f3eeee' }}>

        <View style={{ marginTop: Platform.OS == 'android' ? 50 : 0, width: '100%' }}>
          <View style={{
            backgroundColor: '#fff',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            marginBottom: 40
          }}>
            <Text style={{
              color: '#333',
              fontSize: 24,
              fontWeight: 'bold',
            }}>CADASTRO</Text>
          </View>
          <View style={{ gap: 15 }} >
            <Input value={nome} onChangeText={setNome} placeholder='Nome' />
            <Input mask={Masks.BRL_CPF} value={cpf} onChangeText={(mask) => setCpf(mask)} placeholder='CPF' />
            <Input value={siglaCidade} onChangeText={(text) => setSiglaCidade(text.toUpperCase())} autoCapitalize={'characters'} placeholder='SIGLA CIDADE' maxLength={2} />
            <Input mask={Masks.BRL_CURRENCY} value={valorPassagem} inputMode="numeric" autoCorrect={false} onChangeText={(mask, unmask) => setValorPassagem(unmask)} placeholder='VALOR DA PASSAGEM' />
            <Input mask={createNumberMask({
              prefix: [""],
              delimiter: '',
              separator: '',
              precision: 1,
            })} value={diasTrabalhar} inputMode="numeric" onChangeText={setDiasTrabalhar} placeholder='DIAS A TRABALHAR' />

            <Button onPress={handleCadastro}>CADASTRAR</Button>

          </View>
          <Button onPress={handleTotais}>TOTAIS</Button>

        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}