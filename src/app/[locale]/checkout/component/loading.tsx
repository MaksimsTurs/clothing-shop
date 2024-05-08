import scss from '../scss/loading.module.scss'

export default function Loading() {
  return (
    <div className={scss.loader_container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className={scss.loader_body}>
          <div className={scss.loader_title}></div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '3.5rem' }} className={scss.loader_text}></div>
            <div style={{ width: '3rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '9rem' }} className={scss.loader_text}></div>
            <div style={{ width: '4rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '7rem' }} className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
        </div>
        <div className={scss.loader_body}>
          <div className={scss.loader_title}></div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '3.5rem' }} className={scss.loader_text}></div>
            <div style={{ width: '3rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '9rem' }} className={scss.loader_text}></div>
            <div style={{ width: '4rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '7rem' }} className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
        </div>
        <div className={scss.loader_body}>
          <div className={scss.loader_title}></div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '3.5rem' }} className={scss.loader_text}></div>
            <div style={{ width: '3rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '9rem' }} className={scss.loader_text}></div>
            <div style={{ width: '4rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '7rem' }} className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'end' }}>
        <div className={scss.loader_body}>
          <div className={scss.loader_title}></div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '3.5rem' }} className={scss.loader_text}></div>
            <div style={{ width: '3rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '9rem' }} className={scss.loader_text}></div>
            <div style={{ width: '4rem' }} className={scss.loader_text}></div>
          </div>
          <div className={scss.loader_key_value_container}>
            <div style={{ width: '7rem' }} className={scss.loader_text}></div>
            <div className={scss.loader_text}></div>
          </div>
        </div>
        <div className={scss.loader_button}></div>
      </div>
    </div>
  )
}