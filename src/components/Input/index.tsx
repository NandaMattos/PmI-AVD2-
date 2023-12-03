import MaskInput, { MaskInputProps } from "react-native-mask-input";

export function Input({ children, ...rest }: MaskInputProps) {

  return (
    <MaskInput
      style={{
        height: 50,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      }}

      {...rest}>{children}</MaskInput>
  )
}