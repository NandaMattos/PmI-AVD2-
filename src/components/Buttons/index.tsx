import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native";




export function Button({ children, ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={{
      backgroundColor: '#905396',
      height: 56,
      borderRadius: 10,
      paddingHorizontal: 20,
      width: '100%',
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }} {...rest}>
      <Text style={{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}