import styled from "styled-components";
import tw from "twin.macro";

export const SConfirmTitle = styled.h1`
  ${tw`text-center text-[#fcba03]`}
`

export const SConfirmText = styled.p`
  ${tw`text-center max-w-[400px]`}
`

export const SConfirmWrapper = styled.div`
  ${tw`flex flex-col`}
`

export const SConfirmButtonsWrapper = styled.div`
  ${tw`flex items-center w-full justify-center gap-3 app-max-width-small:flex-col`}
  button {
    ${tw`app-max-width-small:w-[calc(100% - 50px)]`}
  }
`

export const SAuthButtonWrapper = styled.div`
  ${tw`flex items-center gap-3`}
`