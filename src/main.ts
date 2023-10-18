import './style.css';
import { setupProcessor } from './processor.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <form id="form">
      <div>
        <label>File <input name="file" type="file" required /></label>
      </div>
      <div>
        <label>Command <input name="command" type="text" placeholder="!halloween" required /></label>
      </div>
      <button type="submit">Submit</button> <button type="reset">Reset</button>
    </form>
    <div>
      <textarea id="result" rows="20" readonly></textarea>
    </div>
    <div>
      <a href="https://github.com/CocoaCaa/twitch-command-user-extractor" target="_blank" rel="noopener">Source Code</a>
    </div>
  </div>
`;

setupProcessor(document.querySelector('#form')!, document.querySelector('#result')!);
