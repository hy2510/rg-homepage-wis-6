'use client'

import { useState } from 'react'
import {
  Button,
  CheckBox,
  SelectBox,
  SelectBoxItem,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'book_cover'

type VocabularyOption = {
  vocabulary: boolean
  definition1: boolean
  definition1Value?: string
  definition2: boolean
  exampleSentence: boolean
  studentName: boolean
}

export default function VocaPrintOptions({
  onClick,
  onClickDelete,
}: {
  onClick?: (option: VocabularyOption) => void
  onClickDelete: () => void
}) {
  const style = useStyle(STYLE_ID)

  const [vocabularyOption, setVocabularyOption] = useState<VocabularyOption>({
    vocabulary: true,
    definition1: true,
    definition1Value: 'kor',
    definition2: true,
    exampleSentence: true,
    studentName: false,
  })

  const onClickEvent = () => {
    onClick && onClick(vocabularyOption)
  }

  const onCheckChanged = (id: string, value: boolean) => {
    const newVocabularyOption = { ...vocabularyOption }
    switch (id) {
      case 'vocabulary':
        newVocabularyOption.vocabulary = !value
        break
      case 'definition1':
        newVocabularyOption.definition1 = !value
        break
      case 'definition2':
        newVocabularyOption.definition2 = !value
        break
      case 'exampleSentence':
        newVocabularyOption.exampleSentence = !value
        break
      case 'studentName':
        newVocabularyOption.studentName = !value
        break
    }
    setVocabularyOption(newVocabularyOption)
  }

  const onDefinitionChanged = (value: string) => {
    setVocabularyOption({ ...vocabularyOption, definition1Value: value })
  }

  return (
    <div className={style.voca_print_options}>
      <div className={style.btn_delete} onClick={onClickDelete}></div>
      <div className={style.title}>Print Options</div>
      <CheckItem
        check={vocabularyOption.vocabulary}
        title={'Vocabulary'}
        onClick={(currentVal) => onCheckChanged('vocabulary', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.definition1}
        title={'Definition-1'}
        onClick={(currentVal) => onCheckChanged('definition1', currentVal)}
      />
      {vocabularyOption.definition1 && (
        <SelectDefinition
          value={vocabularyOption.definition1Value}
          onDefinitionChanged={onDefinitionChanged}
        />
      )}
      <CheckItem
        check={vocabularyOption.definition2}
        title={'Definition-2 (English)'}
        onClick={(currentVal) => onCheckChanged('definition2', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.exampleSentence}
        title={'Example Sentence (EB level 1)'}
        onClick={(currentVal) => onCheckChanged('exampleSentence', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.studentName}
        title={'Student Name'}
        onClick={(currentVal) => onCheckChanged('studentName', currentVal)}
      />
      <Button onClick={onClickEvent}>Print</Button>
    </div>
  )
}

const CheckItem = ({
  check,
  title,
  onClick,
}: {
  check: boolean
  title: string
  onClick?: (currentVal: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  const onCheckClick = () => {
    onClick && onClick(check)
  }

  return (
    <div className={style.check_item}>
      <CheckBox check={check} onClick={onCheckClick} />
      <div onClick={onCheckClick}>{title}</div>
    </div>
  )
}

const SelectDefinition = ({
  value,
  onDefinitionChanged,
}: {
  value?: string
  onDefinitionChanged?: (value: string) => void
}) => {
  return (
    <SelectBox
      value={value}
      onChange={(e) => {
        onDefinitionChanged && onDefinitionChanged(e.target.value)
      }}>
      <SelectBoxItem value={'kor'}>한국어</SelectBoxItem>
      <SelectBoxItem value={'chi'}>中文</SelectBoxItem>
      <SelectBoxItem value={'vtn'}>Tiếng Việt</SelectBoxItem>
      <SelectBoxItem value={'jap'}>日本語</SelectBoxItem>
      <SelectBoxItem value={'ine'}>Bahasa Indonesia</SelectBoxItem>
    </SelectBox>
  )
}
