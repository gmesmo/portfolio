import styles from './styles.module.scss'

type WavesProps = {
  night?: boolean
}

/**
 * Renders a decorative SVG wave component for desktop layouts.
 *
 * @param night - If true, applies night mode styles to the waves.
 * @returns A React fragment containing the SVG waves.
 *
 * The component uses multiple layered SVG `<use>` elements to create a parallax wave effect.
 * The `night` prop toggles a CSS class for night mode styling.
 */
const Waves = ({ night }: WavesProps) => {
  return (
    <>
      <svg
        className={`${styles.waves} ${night && styles.night}`}
        xmlns='http://www.w3.org/2000/svg'
        xlinkHref='http://www.w3.org/1999/xlink'
        viewBox='0 24 150 28'
        preserveAspectRatio='none'
        shapeRendering='auto'
      >
        <defs>
          <path
            id='gentle-wave'
            d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
          />
        </defs>
        <g className={styles.parallax}>
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='0'
            fill='rgba(255,255,255,0.7'
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='3'
            fill='rgba(255,255,255,0.5)'
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='5'
            fill='rgba(255,255,255,0.3)'
          />
          <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff' />
        </g>
      </svg>
    </>
  )
}

export default Waves
