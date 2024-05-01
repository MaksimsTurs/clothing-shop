import scss from '../scss/checkoutLoader.module.scss'

export default function CheckoutLoader() {
  return(
    <div className={scss.checkout_container}>
      <div className={`${scss.checkout_body} ${scss.default_style}`}>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
        <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
      </div>
      <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        </div>
        <div style={{ flexGrow: '1', width: '100%', height: '2rem' }} className={`${scss.default_style}`}></div>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        </div>
      </div>
      <div style={{ flexGrow: '1', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ flexGrow: '1', width: '100%', height: '2rem' }} className={`${scss.default_style}`}></div>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        </div>
      </div>
      <div style={{ flexGrow: '1', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ flexGrow: '1', width: '100%', height: '2rem' }} className={`${scss.default_style}`}></div>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        </div>
        <div style={{ flexGrow: '1', width: '100%', height: '2rem' }} className={`${scss.default_style}`}></div>
        <div className={`${scss.checkout_body} ${scss.default_style}`}>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_text}`}></div>
          <div className={`${scss.default_style} ${scss.checkout_img}`}></div>
        </div>
      </div>
    </div>
  )
}