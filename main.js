/* eslint-disable camelcase */
// 輸入的量
const input_amount = document.getElementById('original-currency-amount')
// 匯率
const exchange_rate = document.getElementById('exchange-rate')
// 想轉換幣別select
const from_currency = document.getElementById('from_currency')
// 欲轉換幣別select
const to_currency = document.getElementById('to_currency')
// 最底部輸出
const output_amount = document.getElementById('output-text')
// 中間圓按鈕
const exchange = document.getElementById('exchange')
const output_from = document.getElementById('from')
const output_to = document.getElementById('to')
// currency 假資料
const currency = [
  'AED',
  'ARS',
  'AUD',
  'BGN',
  'BRL',
  'BSD',
  'CAD',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CZK',
  'DKK',
  'DOP',
  'EGP',
  'EUR',
  'FJD',
  'GBP',
  'GTQ',
  'HKD',
  'HRK',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'KZT',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PAB',
  'PEN',
  'PHP',
  'PKR',
  'PLN',
  'RYG',
  'RON',
  'RUB',
  'SAR',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'TWD',
  'UAH',
  'USD',
  'UYU',
  'VND',
  'ZAR'
]

// 初始option陣列
let content = ''
currency.forEach(function (item) {
  content += `<option value=${item}>${item}</option>`
})
// console.log(content);
from_currency.innerHTML = content
to_currency.innerHTML = content

// 點擊中間轉換圓鈕事件
exchange.addEventListener('click', () => {
  [from_currency.value, to_currency.value] = [
    to_currency.value,
    from_currency.value
  ]
  calculate()
})

let to_amount = 0
// 計算事件
function calculate () {
  const from_currency_value = from_currency.value
  const to_currency_value = to_currency.value
  // api
  const exchangerateUrl = `https://v6.exchangerate-api.com/v6/3b0ea361e3bbb6b38bf6228c/latest/${from_currency_value}`
  fetch(exchangerateUrl)
    .then((res) => {
      // res.ok如果是 true 則表示狀態碼在於 200~299 之間
      // console.log(res)
      if (!res.ok) {
        alert('網站有問題，稍待片刻')
      }
      return res.json()
    })
    .then((res) => {
      // console.log(res)
      const rate = res.conversion_rates[to_currency_value]
      // console.log(rate)
      // 匯率帶進去
      exchange_rate.value = `${rate}`
      // 輸入要換算的金額會去乘以匯率（取到小數第三位）＝換算後的價格
      to_amount = (input_amount.value * rate).toFixed(3)
      output_from.innerText = `${input_amount.value} ${from_currency_value}`
      output_to.innerText = `${to_amount} ${to_currency_value}`
      output_amount.style.display = 'block'
    })
    .catch(function (err) {
      console.log(err)
    })
}
// 點擊最下面按鈕進行計算
document.getElementById('exchange_button').addEventListener('click', () => {
  calculate()
})
