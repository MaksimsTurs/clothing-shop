import scss from '../scss/checkoutLoader.module.scss'

export default function CheckoutLoader() {
  return(
    <div className={scss.checkout_container}>
      <div className={scss.checkout_body_container}>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        </div>
        <div style={{ width: '40%', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
          <div className={`${scss.checkout_body} ${scss.default_style}`}>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
          </div>
          <div className={`${scss.checkout_body} ${scss.default_style}`}>
            <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
            <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}