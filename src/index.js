import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import { Suspense } from 'react'

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <Suspense fallback={null}>
                        <App />
                    </Suspense>
                </ChakraProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
