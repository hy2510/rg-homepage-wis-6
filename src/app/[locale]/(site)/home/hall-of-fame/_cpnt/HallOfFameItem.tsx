'use client'

import { useStyle } from "@/ui/context/StyleContext"
import Link from "next/link"

const STYLE_ID = 'page_hall_of_fame'

export default function HallOfFameItem({
    num,
    isRate,
    title,
    href,
    date,
    view,
}: {
    num: number
    isRate?: boolean
    title: string
    href: string
    date: string
    view: number
}) {
    const style = useStyle(STYLE_ID)

    return (
        <div className={style.hall_of_fame_board_item}>
            <div className={style.row_1}>
                <div className={style.num}>{num}</div>
                <div className={`${style.rate} ${isRate && style.active}`}></div>
                <Link href={href}>
                    <div className={style.title}>{title}</div>
                </Link>
            </div>
            <div className={style.row_2}>
                <div className={style.date}>{`등록일 ${date}`}</div>
                <div className={style.view}>{`조회 ${view}`}</div>
            </div>
        </div>
    )
}