declare module 'gsap-trial/SplitText' {
  interface SplitTextConfig {
    type?: string;
    linesClass?: string;
    charsClass?: string;
    wordsClass?: string;
    [key: string]: any;
  }

  class SplitText {
    constructor(targets: string | Element | Element[], config?: SplitTextConfig);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
    kill(): void;
  }

  export = SplitText;
}
