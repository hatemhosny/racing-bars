const palettes: Record<string, string[]> = {
  autumnWarmth: ['#7b66d2', '#d62728', '#9467bd', '#ff9e4a', '#cdc05d', '#8c564b', '#bcbd22', '#2f77b4', '#aec7e8', '#6dccda'],
  berryMix: ['#b10318', '#d62728', '#f26c64', '#ed97ca', '#e377c2', '#9467bd', '#7b66d2', '#a699e8', '#dc5fbd', '#998688'],
  boldContrast: ['#ed97ca', '#a2a2a2', '#cdc05d', '#6dccda', '#aec7e8', '#17becf', '#ff7f0e', '#9467bd', '#8c564b', '#bcbd22'],
  boldSunset: ['#d62728', '#ff7f0e', '#ff9e4a', '#ffcd4a', '#cdc05d', '#32a251', '#67bf5c', '#17becf', '#6dccda', '#aec7e8'],
  bright: ['#023EFF', '#FF7C00', '#1AC938', '#E8000B', '#8B2BE2', '#9F4800', '#F14CC1', '#A3A3A3', '#FFC400', '#00D7FF'],
  colorblind: ['#0173B2', '#DE8F05', '#029E73', '#D55E00', '#CC78BC', '#CA9161', '#FBAFE4', '#949494', '#ECE133', '#56B4E9'],
  dark: ['#001C7F', '#B1400D', '#12711C', '#8C0800', '#591E71', '#592F0D', '#A23582', '#3C3C3C', '#B8850A', '#006374'],
  deep: ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
  earthyNeutrals: ['#32a251', '#ff7f0f', '#3cb7cc', '#ffcd4a', '#b85a0d', '#cdc05d', '#a5acaf', '#8f8782', '#cfcfcf', '#2f77b4'],
  elegantPastels: ['#7b66d2', '#a699e8', '#dc5fbd', '#ffd0da', '#5f5a41', '#ac613c', '#cdc05d', '#9edae5', '#9467bd', '#ff7f0e'],
  forestMystic: ['#309343', '#2ca02c', '#50a251', '#32a251', '#cdc05d', '#bcbd22', '#acac58', '#9fcd99', '#67bf5c', '#b85a0d'],
  goldenHour: ['#dba13a', '#ffc156', '#ff9e4a', '#ff7f0e', '#ffcd4a', '#cdc05d', '#ac613c', '#b85a0d', '#9467bd', '#e377c2'],
  iceCreamDream: ['#dc5fbd', '#e377c2', '#ffcd4a', '#cdc05d', '#acac58', '#7b66d2', '#a699e8', '#9467bd', '#aec7e8', '#17becf'],
  midnightPastels: ['#7f7f7f', '#a2a2a2', '#8f8782', '#cfcfcf', '#5f5a41', '#94917b', '#998688', '#e377c2', '#9467bd', '#cdc05d'],
  muted: ['#4878D0', '#EE854A', '#6ACC64', '#D65F5F', '#956CB4', '#8C613C', '#DC7EC0', '#797979', '#D5BB67', '#82C6E2'],
  natureInspired: ['#ff9e4a', '#67bf5c', '#ed665d', '#ad8bc9', '#a8786e', '#ff7f0e', '#2ca02c', '#d62728', '#8c564b', '#bcbd22'],
  neonLights: ['#ff7f0e', '#d62728', '#ffcd4a', '#32a251', '#17becf', '#aec7e8', '#7b66d2', '#e377c2', '#dc5fbd', '#cdc05d'],
  oceanBreeze: ['#006ba4', '#17becf', '#5f9ed1', '#9edae5', '#aec7e8', '#6dccda', '#2f77b4', '#ffcd4a', '#ff7f0e', '#ff9e4a'],
  pastel: ['#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF', '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'],
  pastelDream: ['#7f7f7f', '#acac58', '#2f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#bcbd22'],
  retroPop: ['#7b66d2', '#dc5fbd', '#94917b', '#998688', '#d098ee', '#9467bd', '#17becf', '#ff7f0e', '#2ca02c', '#d62728'],
  softNeutrals: ['#a5acaf', '#cfcfcf', '#8f8782', '#cdc05d', '#b85a0d', '#ac613c', '#ff9e4a', '#9467bd', '#dc5fbd', '#e377c2'],
  softVintage: ['#7f7f7f', '#32a251', '#ff7f0f', '#b85a0d', '#cdc05d', '#a5acaf', '#8f8782', '#cfcfcf', '#2f77b4', '#9467bd'],
  sunsetTones: ['#ed97ca', '#a2a2a2', '#cdc05d', '#6dccda', '#aec7e8', '#ff7f0e', '#17becf', '#9edae5', '#9467bd', '#e377c2'],
  vibrantRedGoldGreen: ['#b10318', '#dba13a', '#309343', '#d82526', '#ffc156', '#f26c64', '#67bf5c', '#ffee71', '#9fcd99', '#729ece'],
  vintageRetro: ['#8c564b', '#998688', '#ac613c', '#b85a0d', '#7b66d2', '#9467bd', '#cdc05d', '#ff7f0e', '#e377c2', '#ff9e4a'],
};

const swatchStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 20,
  height: 20,
  borderRadius: 3,
  marginRight: 2,
};

export default function PaletteGrid() {
  const names = Object.keys(palettes);
  return (
    <table>
      <thead>
        <tr>
          <th>Palette</th>
          <th>Colors</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name) => (
          <tr key={name}>
            <td>
              <code>{name}</code>
            </td>
            <td>
              {palettes[name].map((color, i) => (
                <span
                  key={i}
                  style={{ ...swatchStyle, backgroundColor: color }}
                  title={color}
                />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
