import { styles } from './styles';

export function embedStyles() {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.body.appendChild(styleTag);
}
