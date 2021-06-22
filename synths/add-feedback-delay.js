function AddFeedbackDelay({ ctx, feedbackDelayEffect }) {
  return addFeedbackDelayToChain;
  function addFeedbackDelayToChain(activeSynths) {
    let lastNode = activeSynths[activeSynths.length - 1].node;
    let delay = ctx.createDelay();
    delay.delayTime.value = feedbackDelayEffect.delaySeconds;
    let feedback = ctx.createGain();
    feedback.gain.value = feedbackDelayEffect.feedbackSeconds;
    // lastNode is already connected to destination.
    lastNode.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    feedback.connect(ctx.destination);
  }
}

module.exports = AddFeedbackDelay;
