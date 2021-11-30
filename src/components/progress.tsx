type AppProps = {
  progress: string
}

const Progress = ({ progress }: AppProps) => (
  <div className="progress-wrapper">
    <h3>Progress so far...</h3>
    <div className="progress-bar">
      <div className="progress-done" style={{ width: `${progress}%` }} />
      <div className="progress-text">
        {progress}
        %
      </div>
    </div>
  </div>
);

export default Progress;
