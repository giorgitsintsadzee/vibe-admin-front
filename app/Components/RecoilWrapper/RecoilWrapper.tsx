'use client'
import { ReactNode } from "react"
import { RecoilRoot } from "recoil"

type Props = {
    children: ReactNode
}

const RecoilWarpper = (props: Props) => {
    return (
        <RecoilRoot>{props.children}</RecoilRoot>
    )
}

export default RecoilWarpper