import styled from "styled-components";
import tw from "twin.macro";

export const SGifEmojiContainer = styled.div`
  ${tw`h-[500px] flex justify-center items-center text-center flex-col`}
`

export const GSGridContainer = styled.div`
    ${tw`grid gap-3`}
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`

export const SGridPhoto = styled.div`
  ${tw`w-full flex items-center justify-center overflow-hidden rounded-xl`}
`

export const SGifText = styled.div`
  ${tw`text-font-lg font-black max-w-[300px] mt-4`}
`