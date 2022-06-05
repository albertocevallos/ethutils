import React, { useState, useEffect } from 'react'
import { Text, Input, Spacer, Page, Button, useToasts } from '@geist-ui/core'
import { Repeat } from '@geist-ui/icons'
import { BigNumber as BN } from 'ethers'
import { capitalizeFirstLetter } from 'utils/string'

export const Hex = () => {
  const [base, setBase] = useState<string>('hexadecimal')
  const [value, setValue] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const { setToast } = useToasts()
  const isHex = base == 'hexadecimal'

  useEffect(() => {
    if (value == '') {
      reset()
    }
  }, [value])

  const handleToast = (type: any, msg: string) =>
    setToast({
      text: msg,
      type,
    })

  const reset = () => {
    setValue('')
    setResult('')
  }

  const handleConvert = () => {
    try {
      const num = BN.from(value)
      isHex ? setResult(num.toString()) : setResult(num.toHexString())
      handleToast('success', `Input has been converted to ${isHex ? 'decimal' : 'hexadecimal'}.`)
    } catch (e) {
      console.log(e)
      handleToast('error', `Input not a ${isHex ? 'hexstring of base 16' : 'decimal number'}.`)
    }
  }

  return (
    <React.Fragment>
      <Spacer h={6} />
      <Page.Header>
        <h2>Hexstring Converter</h2>
      </Page.Header>
      <Text p>Hexadecimal to decimal converter.</Text>
      <Spacer h={2} />
      <div style={{ width: 'fit-content' }}>
        <div className="group">
          <div className="select">
            <Input readOnly htmlType="text" width={10} scale={4 / 3} value={capitalizeFirstLetter(base)} label="From" />
            <Button
              iconRight={<Repeat />}
              auto
              scale={2 / 3}
              px={0.6}
              marginLeft={1.5}
              marginRight={1.5}
              onClick={() => {
                base === 'hexadecimal' ? setBase('decimal') : setBase('hexadecimal')
                reset()
              }}
            />
            <Input
              readOnly
              htmlType="text"
              width={10}
              scale={4 / 3}
              value={capitalizeFirstLetter(isHex ? 'decimal' : 'hexadecimal')}
              label="To"
            />
          </div>
          <Spacer h={1} />
          <Input
            placeholder={`Enter ${base} number`}
            htmlType="text"
            width={24}
            scale={4 / 3}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            clearable
          />
          <Spacer h={1} />
        </div>
        <Button onClick={handleConvert} width={2.67} shadow type="secondary">
          Submit
        </Button>
        <Spacer h={3} />
        <Input readOnly htmlType="text" width={24} scale={4 / 3} value={result} placeholder="Result" />
      </div>

      <style jsx>{`
        .group {
          display: flex;
          flex-direction: column;
        }
        .select {
          display: flex;
          align-items: center;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Hex
