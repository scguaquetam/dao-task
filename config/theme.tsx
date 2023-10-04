import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: (props : { colorMode: string; }) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    })
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  }
});