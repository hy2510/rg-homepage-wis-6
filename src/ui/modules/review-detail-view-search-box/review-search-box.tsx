import useTranslation from "@/localization/client/useTranslations";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStyle } from "@/ui/context/StyleContext";

const STYLE_ID = "review_detail_view_search_box";

// 상세보기 리포트 검색박스
export const ReportSearchBox = ({
  startDate,
  endDate,
  isHideKeyword,
  keyword,
  isSearching = false,
  onChangeStartDate,
  onChangeEndDate,
  onChangeKeyword,
  onClickSearch: onClick,
}: {
  startDate: string;
  endDate: string;
  isHideKeyword: boolean;
  keyword: string;
  isSearching?: boolean;
  onChangeStartDate?: (date: string) => void;
  onChangeEndDate?: (date: string) => void;
  onChangeKeyword?: (keyword: string) => void;
  onClickSearch?: (startDate: string, endDate: string, keyword: string) => void;
}) => {
  const style = useStyle(STYLE_ID);
  // @Language 'common'
  const { t } = useTranslation();

  const [lKeyword, setlKeyword] = useState(keyword || "");
  const [lStartDate, setlStartDate] = useState(startDate);
  const [lEndDate, setlEndDate] = useState(endDate);
  const [isSelectTextField, setIsSelectTextField] = useState(false);

  useEffect(() => {
    setlKeyword(keyword || "");
    if (!keyword) {
      setIsSelectTextField(false);
    }
  }, [keyword]);

  useEffect(() => {
    setlStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setlEndDate(endDate);
  }, [endDate]);

  const [period, setPeriod] = useState(30);
  const [today, setToday] = useState("");
  const [daysAgo7, setDaysAgo7] = useState("");
  const [daysAgo14, setDaysAgo14] = useState("");
  const [daysAgo30, setDaysAgo30] = useState("");

  useEffect(() => {
    // 오늘 날짜 계산
    const currentDate = new Date();
    currentDate.setHours(12, 0, 0, 0);
    setToday(currentDate.toISOString().split("T")[0]);

    // 7일 전 날짜 계산
    const previousDate7 = new Date(currentDate);
    previousDate7.setHours(12, 0, 0, 0);
    previousDate7.setDate(currentDate.getDate() - 6);
    setDaysAgo7(previousDate7.toISOString().split("T")[0]);

    // 15일 전 날짜 계산
    const previousDate15 = new Date(currentDate);
    previousDate15.setHours(12, 0, 0, 0);
    previousDate15.setDate(currentDate.getDate() - 14);
    setDaysAgo14(previousDate15.toISOString().split("T")[0]);

    // 30일 전 날짜 계산
    const previousDate30 = new Date(currentDate);
    previousDate30.setHours(12, 0, 0, 0);
    previousDate30.setDate(currentDate.getDate() - 29);
    setDaysAgo30(previousDate30.toISOString().split("T")[0]);
  }, []);

  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    searchButtonRef.current?.click()
  }, [period])

  return (
    <div className={style.report_search_box2}>
      <div className={style.set_period_options}>
        <div
          className={`${style.option} ${period == 1 && style.active}`}
          onClick={() => {
            setlStartDate(today);
            setPeriod(1);
            setIsSelectTextField(false);
          }}
        >
          {t('t761', { num: 1 })}
        </div>
        <div
          className={`${style.option} ${period == 7 && style.active}`}
          onClick={() => {
            setlStartDate(daysAgo7);
            setPeriod(7);
            setIsSelectTextField(false);
          }}
        >
          {t('t408', { num: 7 })}
        </div>
        <div
          className={`${style.option} ${period == 15 && style.active}`}
          onClick={() => {
            setlStartDate(daysAgo14);
            setPeriod(15);
            setIsSelectTextField(false);
          }}
        >
          {t('t408', { num: 15 })}
        </div>
        <div
          className={`${style.option} ${period == 30 && style.active}`}
          onClick={() => {
            setlStartDate(daysAgo30);
            setPeriod(30);
            setIsSelectTextField(false);
          }}
        >
          {t('t408', { num: 30 })}
        </div>
      </div>
      <div className={style.search_bar}>
        <div className={style.search_type}>
          
          <div className={style.column1}>
            <div
              className={style.period}
              onClick={() => {
                isSelectTextField ? setIsSelectTextField(false) : null;
                setPeriod(0);
              }}
            >
              <div
                className={`${style.start_date} ${isSelectTextField ? style.deactive : ""}`}
              >
                <input
                  type="date"
                  value={lStartDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setlStartDate(value);
                    onChangeStartDate && onChangeStartDate(value);
                  }}
                />
              </div>
              <div>~</div>
              <div
                className={`${style.end_date} ${isSelectTextField ? style.deactive : ""}`}
              >
                <input
                  type="date"
                  value={lEndDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setlEndDate(value);
                    onChangeEndDate && onChangeEndDate(value);
                  }}
                />
              </div>
            </div>

            {isHideKeyword ? (
              <></>
            ) : (
              <div
                className={`${style.search_bar} ${isSelectTextField ? style.active : ""}`}
                onClick={() => {
                  isSelectTextField ? null : setIsSelectTextField(true);
                  setPeriod(0);
                }}
              >
                <input
                  type="text"
                  placeholder={t("t547")}
                  value={isSelectTextField ? lKeyword : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setlKeyword(value);
                    onChangeKeyword && onChangeKeyword(value);
                  }}
                  onKeyDown={(e) => {
                    if (lKeyword.trim().length <= 0) {
                      return;
                    }
                    if (e.key.toLowerCase() === "enter") {
                      e.currentTarget?.blur();
                      onClick && onClick(lStartDate, lEndDate, lKeyword);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            if (!isSearching) {
              onClick && onClick(lStartDate, lEndDate, lKeyword);
            }
          }}
          ref={searchButtonRef}
          className={style.search_button}
        >
          <Image
            alt=""
            src="/src/images/search-icons/search_white.svg"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};
