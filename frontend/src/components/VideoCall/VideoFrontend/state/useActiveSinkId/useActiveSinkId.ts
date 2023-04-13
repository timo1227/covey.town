/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useState } from 'react';
import { SELECTED_AUDIO_OUTPUT_KEY } from '../../constants';
import useDevices from '../../hooks/useDevices/useDevices';

export default function useActiveSinkId() {
  const { audioOutputDevices } = useDevices();
  const [activeSinkId, _setActiveSinkId] = useState('default');

  const setActiveSinkId = useCallback((sinkId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof window !== 'undefined' && window.localStorage.setItem(SELECTED_AUDIO_OUTPUT_KEY, sinkId);
    _setActiveSinkId(sinkId);
  }, []);

  useEffect(() => {
    const selectedSinkId =
      typeof window !== 'undefined' ? window.localStorage.getItem(SELECTED_AUDIO_OUTPUT_KEY) : null;
    const hasSelectedAudioOutputDevice = audioOutputDevices.some(
      device => selectedSinkId && device.deviceId === selectedSinkId,
    );
    if (hasSelectedAudioOutputDevice) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      _setActiveSinkId(selectedSinkId!);
    }
  }, [audioOutputDevices]);

  return [activeSinkId, setActiveSinkId] as const;
}
