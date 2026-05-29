import React, { useState, useEffect, useRef, useMemo } from 'react';
import { observeStart, observeDrop, observeCorpusText } from '../api/habitat';

const CORPUS = 'romeo-juliet';
const DEMO_ENABLED = false;
const BG_COLORS = ['#ffffff'];

export default function FirstObservation() {
  const bgColor = useMemo(() => BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)], []);
  const [corpusText, setCorpusText] = useState(null);
  const [corpusTitle, setCorpusTitle] = useState(null);
  const [observeResult, setObserveResult] = useState(null);
  const [observeError, setObserveError] = useState(null);
  const [observing, setObserving] = useState(false);
  const scrollRef = useRef(null);
  const replyRef = useRef(null);
  const startPromise = useRef(null);

  useEffect(() => {
    if (!DEMO_ENABLED) return;
    observeCorpusText(CORPUS).then(r => {
      setCorpusText(r.text);
      setCorpusTitle(r.title || null);
    }).catch(err => console.error('[corpus-text]', err));
    startPromise.current = observeStart(CORPUS);
    startPromise.current.catch(() => {});
  }, []);

  const handleObserve = async () => {
    if (observing) return;
    setObserving(true);
    setObserveError(null);
    try {
      let start;
      try {
        start = await startPromise.current;
      } catch {
        startPromise.current = observeStart(CORPUS);
        start = await startPromise.current;
      }
      const { session_id } = start;
      const result = await observeDrop(session_id);
      setObserveResult(result);
      setTimeout(() => {
        if (scrollRef.current && replyRef.current) {
          scrollRef.current.scrollTo({ top: replyRef.current.offsetTop, behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('[observe]', err);
      setObserveError('The field is unavailable. Try again later.');
    } finally {
      setObserving(false);
    }
  };

  const handleCaretClick = () => {
    scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="fo-scroll" ref={scrollRef}>
      {/* Header */}
      <header className="fo-header">
        <span className="fo-wordmark">Curious</span>
      </header>

      {/* Panel 1 — Statement */}
      <section className="fo-panel fo-hero">
        <div className="fo-content">
          <div className="fo-hero-row">
            <div className="fo-lede-block">
              <p className="fo-lede">
                Curious measures language. Specifically, we measure expression: what is said, implied, and unspoken.
              </p>
            </div>
            <figure className="fo-figure">
              <img className="fo-hero-img" src="/manifold.jpg" alt="GLORIA, cut-outs on board, 16 x 20, Todd Colby, 2023" />
              <figcaption className="fo-caption">
                &ldquo;GLORIA&rdquo;, cut-outs on board, 16&quot; x 20&quot;, Todd Colby. 2023.*
              </figcaption>
            </figure>
          </div>
          <div className="fo-statement">
            <p className="fo-body">
              To do this, we built an instrument called Habitat.
              Habitat is non-generative. It does not predict, recommend, or complete.
              It measures, and it hands the measurement back to you.
            </p>
            <p className="fo-body">
              More, Habitat sequesters agents and language models. Your words are never shown.
              This means you can work with models knowing your words remain your own. They're not training data.
            </p>
          </div>
          <div className="fo-asterisk">
            Habitat takes the form of both Euclidean and Riemannian geometry. In geometric terms it has a &ldquo;chart-on-manifold&rdquo; structure, one that measures expression, where point, line and plane meet. Where words meet context, their statement, their trajectory toward another, and their curve, warp and fold.
          </div>
          <p className="fo-lede-note">
            The image, &ldquo;GLORIA&rdquo;, can be seen as a manifold, or laundry tumbling in a dryer, or language.
          </p>
        </div>
        {DEMO_ENABLED && <div className="fo-caret" onClick={handleCaretClick}>∨</div>}
        <footer className="fo-footer">
          <p>Curious Company, LLC © 2026</p>
        </footer>
      </section>

      {/* Panel 2 — Prologue + Button (disabled until DEMO_ENABLED) */}
      {DEMO_ENABLED && (
        <section className="fo-panel fo-demo">
          <div className="fo-demo-inner">
            {corpusText && (
              <>
                {corpusTitle && <p className="fo-title">{corpusTitle}</p>}
                <p className="fo-prologue">{corpusText}</p>
              </>
            )}

            {!observeResult && corpusText && !observing && (
              <button className="fo-btn" onClick={handleObserve}>
                Send to Habitat
              </button>
            )}

            {observing && (
              <p className="fo-loading">Composing…</p>
            )}

            {observeError && (
              <p className="fo-error">{observeError}</p>
            )}
          </div>
          {observeResult && (
            <div className="fo-caret fo-caret-demo" onClick={() => { if (scrollRef.current && replyRef.current) scrollRef.current.scrollTo({ top: replyRef.current.offsetTop, behavior: 'smooth' }); }}>∨</div>
          )}
        </section>
      )}

      {/* Panel 3 — Reply (disabled until DEMO_ENABLED) */}
      {DEMO_ENABLED && observeResult && (
        <section className="fo-reply-panel" ref={replyRef}>
          <div className="fo-reply-inner">
            <div className="fo-reply fade-in">
              <p className="fo-reply-text">{observeResult.reply}</p>
              <ul className="fo-couplings">
                {observeResult.couplings?.map((c, i) => (
                  <li key={i} className="fo-coupling">
                    {c.actor} – {c.assertion}  .{String(Number(c.magnitude).toFixed(3)).replace(/^0\./, '')}
                  </li>
                ))}
              </ul>
              {observeResult.field_note && (
                <p className="fo-field-note">{observeResult.field_note}</p>
              )}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .fo-scroll {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          scroll-behavior: smooth;
          background: ${bgColor};
        }

        .fo-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 32px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10;
        }

        .fo-wordmark {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #232a2d;
          letter-spacing: 0.01em;
        }

        .fo-panel {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          padding: 80px 0;
        }

        .fo-hero {
          padding-top: 140px;
        }

        .fo-content {
          max-width: 720px;
          width: 100%;
          padding: 0 32px;
          box-sizing: border-box;
        }

        .fo-hero-row {
          display: flex;
          align-items: center;
          gap: 2.4em;
          margin: 0 0 3.5em;
        }

        .fo-figure {
          flex: 0 0 48%;
          margin: 0;
        }
        .fo-hero-img {
          width: 100%;
          display: block;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .fo-caption {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 0.7rem;
          color: #232a2d80;
          margin: 0.6em 0 0;
          text-align: right;
        }

        .fo-lede-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fo-lede {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 1.9rem;
          font-weight: 500;
          line-height: 1.25;
          color: #232a2d;
          margin: 0 0 0em;
        }

        .fo-lede-note {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          line-height: 1.4;
          color: #232a2d80;
          margin: 0 0 4em 0;
        }

        .fo-statement {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .fo-body {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.3rem;
          font-weight: 400;
          line-height: 1.5;
          color: #3d301d;
          margin: 0 0 1.4em;
        }

        .fo-asterisk {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          line-height: 1.4;
          color: #232a2d80;
          margin: 2em 0 2em;
        }
        .fo-link {
          color: #bfdcce;
          text-decoration: none;
          border-bottom: 1px solid #bfdcce40;
          transition: border-color 0.2s;
        }
        .fo-link:hover {
          border-color: #bfdcce;
        }
        .fo-caret {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.6rem;
          color: #c2d657;
          opacity: 0.5;
          animation: foCaret 3.6s ease-in-out infinite;
          cursor: pointer;
        }
        .fo-caret-demo {
          animation: foCaret 3.6s ease-in-out infinite;
        }
        @keyframes foCaret {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .fo-demo-inner {
          max-width: 620px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .fo-title {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #dcd0bf;
          margin: 0 0 0.6em;
          align-self: flex-start;
        }
        .fo-prologue {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.05rem;
          font-weight: 400;
          line-height: 1.8;
          color: #dcd0bf;
          white-space: pre-line;
          margin: 0 0 1.4em;
          align-self: flex-start;
        }
        .fo-btn {
          display: block;
          margin: 2em 0 0;
          align-self: center;
          padding: 10px 28px;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          color: #dcd0bf;
          background: transparent;
          border: 1px solid #dcd0bf;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .fo-btn:hover {
          background: rgba(220, 208, 191, 0.06);
        }

        .fo-reply-panel {
          display: flex;
          justify-content: center;
          padding: 4em 0 6em;
          box-sizing: border-box;
        }
        .fo-reply-inner {
          max-width: 620px;
          padding: 0 32px;
          width: 100%;
        }
        .fo-reply {
          margin: 0 0 4em;
          padding: 1.4em 1.6em;
          border: 1px solid #dcd0bf52;
          border-radius: 2px;
          width: 100%;
          box-sizing: border-box;
        }
        .fo-reply.fade-in {
          animation: foFadeIn 0.6s ease-in;
        }
        @keyframes foFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fo-reply-text {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.1rem;
          font-weight: 400;
          line-height: 1.55;
          color: #dcd0bf;
          margin: 0 0 1em;
        }
        .fo-couplings {
          list-style: none;
          padding: 0;
          margin: 0.8em 0 0;
        }
        .fo-coupling {
          font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
          font-size: 0.75rem;
          color: #bfdcc7a1;
          line-height: 1.8;
          white-space: pre;
        }
        .fo-field-note {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          line-height: 1.4;
          color: #dcd0bf94;
          margin: 1.2em 0 0;
        }
        .fo-loading {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          color: #dcd0bf5e;
          text-align: center;
          margin: 2em 0;
          animation: foPulse 1s ease-in-out infinite;
        }
        @keyframes foPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .fo-error {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.85rem;
          color: #dcd0bf5e;
          text-align: center;
          margin: 2em 0;
        }

        .fo-footer {
          position: absolute;
          bottom: 32px;
          left: 0;
          padding-left: 32px;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.7rem;
          color: #3e3c3b;
          line-height: 1.6;
        }
        .fo-footer p {
          margin: 0;
          color: #232a2d80;
        }

        @media (max-width: 768px) {
          .fo-hero-row {
            flex-direction: column;
            gap: 1.6em;
          }
          .fo-figure {
            flex: none;
            width: 100%;
          }
          .fo-content { padding: 0 20px; }
          .fo-header { padding: 20px 20px; }
          .fo-footer { padding-left: 20px; }
          .fo-demo-inner { padding: 0 20px; }
          .fo-reply-inner { padding: 0 20px; }
          .fo-lede { font-size: 1.45rem; }
          .fo-body { font-size: 1.2rem; }
          .fo-prologue { font-size: 1rem; }
          .fo-reply-text { font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .fo-content { padding: 0 16px; }
          .fo-header { padding: 20px 16px; }
          .fo-footer { padding-left: 16px; }
          .fo-demo-inner { padding: 0 16px; }
          .fo-reply-inner { padding: 0 16px; }
          .fo-lede { font-size: 1.3rem; }
          .fo-body { font-size: 1.15rem; }
          .fo-prologue { font-size: 0.95rem; }
          .fo-reply-text { font-size: 0.95rem; }
          .fo-reply { padding: 1em 1.1em; }
        }
      `}</style>
    </div>
  );
}
