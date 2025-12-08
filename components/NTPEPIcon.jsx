import { useEffect } from 'react';

const NTPEPIcon = ({ mcode, prkey }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.textContent = `var _mcode = "${mcode}"; var _prkey = "${prkey}"; var _stype = "1";`;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://data.ntpep.org/AuditSeal.js';
    script3.async = true;
    document.body.appendChild(script3);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    };
  }, [mcode, prkey]);

  return <span id="imgDisplay"></span>;
};

export default NTPEPIcon;
