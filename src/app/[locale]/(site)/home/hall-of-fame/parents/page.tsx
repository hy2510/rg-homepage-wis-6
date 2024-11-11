'use client'

import { Margin } from "@/ui/common/common-components"
import PaginationBar from "@/ui/common/PaginationBar"
import HallOfFameItem from "../_cpnt/HallOfFameItem"

export default function Page() {
  return (
    <>
      {/* 한페이지에 리스트 10개씩 표시 */}
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <HallOfFameItem num={876} isRate title="아들은 나의 힘" href="1000" date="2024-10-10" view={2000} />
      <Margin height={20} />
      <PaginationBar />
    </>
  )
}