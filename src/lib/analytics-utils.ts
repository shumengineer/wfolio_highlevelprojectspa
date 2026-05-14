import posthog from 'posthog-js'

/**
 * Fail-safe copy to clipboard with PostHog analytics integration.
 * Works across all modern and legacy browsers.
 */
export const copyToClipboard = async (text: string, context: string = 'general') => {
  let success = false;

  // 1. Try modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch (err) {
      console.warn('Clipboard API failed, falling back...', err);
    }
  }

  // 2. Fallback to textarea + execCommand
  if (!success) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Ensure it's not visible but part of DOM
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      success = document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  }

  // 3. Log Analytics
  if (success && posthog.__loaded) {
    posthog.capture('email_copied', {
      value: text,
      context: context,
      url: window.location.pathname
    });
  }

  return success;
}
