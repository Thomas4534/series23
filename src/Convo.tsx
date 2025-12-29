import { useState, useEffect } from 'react';

function Convo() {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [mountedKeys, setMountedKeys] = useState(new Set());
  const [isExiting, setIsExiting] = useState(false); 

  const messageSets = [
    [
      { type: 'blue', number: 1, ext: 'svg' },
      { type: 'grey', number: 1, ext: 'svg' },
      { type: 'profile', number: 1, ext: 'jpg' }
    ],

    [
      { type: 'blue', number: 3, ext: 'svg' },
      { type: 'grey', number: 3, ext: 'svg' },
      { type: 'profile', number: 3, ext: 'jpg' }
    ]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= 3) {
          setIsExiting(true);
          setMountedKeys(new Set());

          setTimeout(() => {
            setIsExiting(false);
            setCurrentSet(prevSet =>
              prevSet + 1 >= messageSets.length ? 0 : prevSet + 1
            );
            setCurrentMessageIndex(-1);
            setVisibleMessages([]);
          }, 600);

          return 3;
        }

        return nextIndex;
      });
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentMessageIndex >= 0) {
      setVisibleMessages(
        messageSets[currentSet].slice(0, currentMessageIndex + 1)
      );
    } else {
      setVisibleMessages([]);
    }
  }, [currentSet, currentMessageIndex]);

  useEffect(() => {
    if (visibleMessages.length > 0 && !isExiting) {
      const latestMessage = visibleMessages[visibleMessages.length - 1];
      const key = `${latestMessage.type}${latestMessage.number}-${visibleMessages.length - 1}`;

      requestAnimationFrame(() => {
        setMountedKeys(prev => new Set(prev).add(key));
      });
    }
  }, [visibleMessages, isExiting]);

  const getMessageStyle = (messageType, index, isMounted) => {
    const finalStyle = {
      transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      transform: 'translateY(0) scale(1)',
      opacity: 1
    };

    const hiddenStyle = {
      transform: 'translateY(20px) scale(0.95)',
      opacity: 0,
      transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    };

    const horizontalPosition =
      messageType === 'blue' || messageType === 'profile'
        ? { left: '30%' }
        : { right: '30%' };

    const verticalOffset = messageType === 'profile' ? -30 : 0;

    const extraProfileSpacing =
      index > 0 &&
      visibleMessages[index - 1]?.type === 'grey' &&
      messageType === 'profile'
        ? 30
        : 0;

    const reducedBlueGreySpacing =
      index > 0 &&
      visibleMessages[index - 1]?.type === 'blue' &&
      messageType === 'grey'
        ? -20
        : 0;

    const shouldShow = isMounted && !isExiting;

    return {
      position: 'absolute',
      top: `${140 + index * 85 + verticalOffset + extraProfileSpacing + reducedBlueGreySpacing}px`,
      maxWidth: messageType === 'profile' ? '45%' : '70%',
      backgroundColor: 'transparent',
      zIndex: messageType === 'profile' ? 30 : 10,
      ...horizontalPosition,
      ...(shouldShow ? finalStyle : hiddenStyle)
    };
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <div className="relative flex justify-center">
        <div className="relative w-full max-w-[700px] min-w-[400px] h-[650px]">
          <div className="relative overflow-hidden h-full w-full">
            <img
              src="/images/iphone.jpg"
              alt="Series app on iPhone"
              className="absolute top-0 left-0 w-full h-full object-cover object-top scale-110"
            />

            <div className="absolute inset-0">
              {visibleMessages.map((message, index) => {
                const { type, number, ext } = message;
                const key = `${type}${number}-${index}`;
                const isMounted = mountedKeys.has(key);

                return (
                  <div
                    key={key}
                    style={getMessageStyle(type, index, isMounted)}
                    className="rounded-lg shadow-lg"
                  >
                    <img
                      src={`/images/${type}${number}.${ext}`}
                      alt={`${type} message ${number}`}
                      className="w-full h-auto"
                      style={{
                        backgroundColor: 'transparent',
                        display: 'block',
                        transform: 'scale(1.05)',
                        filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))'
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
              style={{
                zIndex: 20,
                background:
                  'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 70%, transparent 100%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Convo;
