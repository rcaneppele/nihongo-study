import { describe, expect, it } from 'vitest';
import { deveAvisarInstalacao, ehSafariDoIos } from './instalacao';

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const IPAD_COMO_MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
const CHROME_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0 Mobile/15E148 Safari/604.1';
const FIREFOX_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/130.0 Mobile/15E148 Safari/605.1.15';
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36';
const WEBVIEW_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

describe('ehSafariDoIos', () => {
  it.each([
    ['iPhone', IPHONE, 5, true],
    ['iPad (se apresenta como Mac, com toque)', IPAD_COMO_MAC, 5, true],
    ['Mac de verdade (sem toque)', IPAD_COMO_MAC, 0, false],
    ['Chrome no iPhone', CHROME_IOS, 5, false],
    ['Firefox no iPhone', FIREFOX_IOS, 5, false],
    ['navegador interno de outro app', WEBVIEW_IOS, 5, false],
    ['Android', ANDROID, 5, false],
  ])('%s', (_nome, userAgent, maxTouchPoints, esperado) => {
    expect(ehSafariDoIos({ userAgent, maxTouchPoints })).toBe(esperado);
  });
});

describe('deveAvisarInstalacao', () => {
  const safari = { userAgent: IPHONE, maxTouchPoints: 5, instalado: false };

  it('avisa no Safari do iPhone, com o app fora da tela inicial', () => {
    expect(deveAvisarInstalacao(safari, false)).toBe(true);
  });

  it('não avisa depois de instalado', () => {
    expect(deveAvisarInstalacao({ ...safari, instalado: true }, false)).toBe(false);
  });

  it('não avisa depois de dispensado', () => {
    expect(deveAvisarInstalacao(safari, true)).toBe(false);
  });

  it('não avisa em outros navegadores', () => {
    expect(deveAvisarInstalacao({ ...safari, userAgent: ANDROID }, false)).toBe(false);
  });
});
