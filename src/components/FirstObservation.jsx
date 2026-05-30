import React, { useState, useEffect, useRef, useMemo } from 'react';
import { observeStart, observeDrop, observeCorpusText } from '../api/habitat';

const CORPUS = 'romeo-juliet';
const DEMO_ENABLED = false;
const BG_COLORS = ['#ffffff'];

const WHO_ROWS = [
  ['Councils, planning boards', "A public process with voices that won't agree", 'Every voice heard. You still decide.'],
  ['Consulting, strategy, advisory', "A client corpus no one's read whole", 'Read the corpus, not the summary.'],
  ['Media, newsrooms, journalists', 'A beat where the omission is the story', 'Find the story no one wrote.'],
  ['Tribal, county, regional bodies', 'Two governing frameworks that must coordinate', "Where your frameworks meet, and don't."],
  ['Institutions, instructors', 'Student work measured against the curriculum', 'See how far each student traveled.'],
  ['HR, org development, comms', "Departments that say they're aligned", 'Find the alignment you only claim.'],
  ['Researchers, foundations, libraries', 'A literature too vast to read whole', 'Map the known and the unsaid.'],
  ['Writers, thinkers, academics', 'A work that should outlive its platform', 'Publish work that stays your own.'],
];

function Footnote({ n, children }) {
  return (
    <span className="fo-fn" tabIndex={0} role="note" aria-label={`Footnote ${n}`}>
      <sup className="fo-fn-mark">{n}</sup>
      <span className="fo-fn-pop">{children}</span>
    </span>
  );
}

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
              Habitat sequesters agents and language models. Your words are never shown.
              This means you can work with models knowing your words remain your own. They're not training data.
            </p>
            <p className="fo-body">
              Why do this? Curiosity, creativity, deliberation, and policy make the world.
              Expression determines its shape.
            </p>
          </div>
          <div className="fo-who">
            <hr className="fo-rule" />
            <div className="fo-found">
              <h2 className="fo-found-head">What we&rsquo;ve found</h2>
              <p className="fo-found-body">
                Meaning is not held in the words, or even in the dimensions we chart, but in how they couple &mdash; what creases to what, and what stays slack. Some couplings hold so tightly they move as one<Footnote n="1">transitivity and thematic-role depth &mdash; the grammar of who acts upon whom &mdash; couple so tightly they behave as a single thread, at correlations near 0.97&ndash;0.99.</Footnote>; others spread wide, pulling on everything around them<Footnote n="2">A dimension like animacy couples diffusely &mdash; a hub touching many others at once rather than locking to one.</Footnote>. And the reading is itself a coupling: whoever enters the text enters the same fabric, and acts and asserts through it and beyond it. We held this contour to a blind test<Footnote n="3">A prediction registered in advance and run on ~1,440 compositions of a corpus the instrument had never seen; it held on every count &mdash; including the one band we had predicted could not be resolved &mdash; across writing as far apart as eighteenth-century letters and present-day civic reports.</Footnote>, and it kept its shape &mdash; even where we had said it could not. So the document is not precious; the fabric goes on coupling past the last line, where every actor and every assertion is already expression.
              </p>
            </div>
            <hr className="fo-rule" />
            <h2 className="fo-found-head">Who does this help?</h2>
            <p className="fo-teeup">
              Wherever many voices have to be read and a decision made, something breaks: quiet is lost, dissent becomes consensus, or now a language model takes the words and decides for you. Habitat does none of this. It measures the whole of what was said and hands it back, every expression intact.
            </p>
            <div className="fo-who-table">
              {WHO_ROWS.map(([who, need, line], i) => (
                <div className="fo-who-row" key={i}>
                  <div className="fo-who-aud">{who}</div>
                  <div className="fo-who-need">{need}</div>
                  <div className="fo-who-line">{line}</div>
                </div>
              ))}
            </div>
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

        .fo-who {
          margin: 3em 0 0;
        }
        .fo-rule {
          border: none;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          margin: 0 0 2.4em;
        }
        .fo-teeup {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.45;
          color: #3d301d;
          margin: 0 0 2em;
        }
        .fo-who-table {
          display: flex;
          flex-direction: column;
        }
        .fo-who-row {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1.3fr;
          gap: 1.6em;
          align-items: baseline;
          padding: 1.1em 0;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .fo-who-row:last-child {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .fo-who-aud {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.35;
          color: #232a2d;
        }
        .fo-who-need {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.92rem;
          font-weight: 400;
          line-height: 1.4;
          color: #D96543;
        }
        .fo-who-line {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.3;
          color: #232a2d;
        }

        .fo-found {
          margin: 0 0 2.4em;
        }
        .fo-found-head {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 1.5rem;
          font-weight: 500;
          line-height: 1.2;
          color: #232a2d;
          margin: 0 0 0.8em;
        }
        .fo-found-body {
          font-family: "EB Garamond", Georgia, "Times New Roman", serif;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.45;
          color: #3d301d;
          margin: 0;
        }
        .fo-fn {
          position: relative;
          cursor: help;
          outline: none;
        }
        .fo-fn-mark {
          color: #4A8F8C;
          font-weight: 600;
          font-size: 0.62em;
          vertical-align: super;
          line-height: 0;
          padding: 0 2px;
        }
        .fo-fn-pop {
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%) translateY(-8px);
          width: max-content;
          max-width: min(320px, 80vw);
          padding: 0.7em 0.9em;
          background: #232a2d;
          color: #f1ede6;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1.5;
          border-radius: 3px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease;
          z-index: 30;
          pointer-events: none;
          text-align: left;
        }
        .fo-fn:hover .fo-fn-pop,
        .fo-fn:focus .fo-fn-pop,
        .fo-fn:focus-within .fo-fn-pop {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
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
          .fo-teeup { font-size: 1.2rem; }
          .fo-found-head { font-size: 1.35rem; }
          .fo-found-body { font-size: 1.2rem; }
          .fo-who-row {
            grid-template-columns: 1fr;
            gap: 0.5em;
            padding: 1.2em 0;
          }
          .fo-who-line { font-size: 1.1rem; margin-top: 0.1em; }
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
          .fo-teeup { font-size: 1.15rem; }
          .fo-found-head { font-size: 1.25rem; }
          .fo-found-body { font-size: 1.15rem; }
          .fo-who-line { font-size: 1.05rem; }
        }
      `}</style>
    </div>
  );
}
