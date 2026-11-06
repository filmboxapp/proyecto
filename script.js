(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.AOS && !reduced) {
    AOS.init({duration: 850, easing: 'ease-out-cubic', once: false, mirror: true, offset: 80, anchorPlacement: 'top-bottom'});
    window.addEventListener('load', () => AOS.refreshHard(), {once: true});
  } else {
    document.querySelectorAll('[data-aos]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  const planets = {
    mercurio: {name:'Mercurio',type:'PLANETA ROCOSO · EL MÁS CERCANO AL SOL',description:'Es el planeta más pequeño y el más cercano al Sol. Su superficie está llena de cráteres.',fact:'Un año en Mercurio dura solo 88 días terrestres.',counter:'PLANETA 01 / 08',symbol:'☿'},
    venus: {name:'Venus',type:'PLANETA ROCOSO · EL MÁS CALIENTE',description:'Tiene una atmósfera muy densa, rica en dióxido de carbono, que atrapa el calor.',fact:'Su superficie alcanza unos 465 °C: más caliente que la de Mercurio.',counter:'PLANETA 02 / 08',symbol:'♀'},
    tierra: {name:'La Tierra',type:'PLANETA ROCOSO · NUESTRO HOGAR',description:'Es el único mundo conocido que alberga vida. El agua líquida y una atmósfera protectora son parte de sus condiciones especiales.',fact:'La energía del Sol impulsa el clima y sostiene la fotosíntesis.',counter:'PLANETA 03 / 08',symbol:'⊕'},
    marte: {name:'Marte',type:'PLANETA ROCOSO · EL PLANETA ROJO',description:'Su color se debe al óxido de hierro de su suelo. Tiene volcanes gigantes y señales de antiguos ríos.',fact:'Un día marciano dura aproximadamente 24 horas y 37 minutos.',counter:'PLANETA 04 / 08',symbol:'♂'},
    jupiter: {name:'Júpiter',type:'GIGANTE GASEOSO · EL MÁS GRANDE',description:'Es el planeta más grande del sistema solar. Sus bandas son nubes que se mueven en una atmósfera turbulenta.',fact:'La Gran Mancha Roja es una tormenta que lleva siglos activa.',counter:'PLANETA 05 / 08',symbol:'♃'},
    saturno: {name:'Saturno',type:'GIGANTE GASEOSO · MUNDO DE ANILLOS',description:'Sus anillos están formados principalmente por fragmentos de hielo y roca que orbitan alrededor del planeta.',fact:'Saturno es tan poco denso que, en teoría, flotaría en agua.',counter:'PLANETA 06 / 08',symbol:'♄'},
    urano: {name:'Urano',type:'GIGANTE HELADO · EJE INCLINADO',description:'Su atmósfera contiene hidrógeno, helio y metano, que le da su tono azul verdoso.',fact:'Gira casi de lado: su eje está inclinado unos 98 grados.',counter:'PLANETA 07 / 08',symbol:'♅'},
    neptuno: {name:'Neptuno',type:'GIGANTE HELADO · EL MÁS LEJANO',description:'Es un mundo frío y ventoso en los confines del sistema solar. Su intenso color azul se observa desde lejos.',fact:'Sus vientos pueden superar los 2,000 km/h.',counter:'PLANETA 08 / 08',symbol:'♆'}
  };
  const buttons = [...document.querySelectorAll('.solar-body')];
  const type = document.getElementById('planet-type');
  const name = document.getElementById('planet-name');
  const description = document.getElementById('planet-description');
  const fact = document.getElementById('planet-fact');
  const counter = document.getElementById('planet-counter');
  buttons.forEach(button => button.addEventListener('click', () => {
    const planet = planets[button.dataset.planet];
    if (!planet) return;
    buttons.forEach(item => item.classList.toggle('selected', item === button));
    type.textContent = planet.type;
    name.textContent = planet.name;
    description.textContent = planet.description;
    fact.textContent = planet.fact;
    counter.innerHTML = `${planet.counter} <b>${planet.symbol}</b>`;
  }));

  const cards = [...document.querySelectorAll('.energy-card')];
  const hint = document.querySelector('.card-hint');
  cards.forEach(card => {
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      cards.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-expanded', 'false'); });
      if (!wasActive) {
        card.classList.add('active'); card.setAttribute('aria-expanded', 'true');
        hint.textContent = `Así se manifiesta la energía ${card.querySelector('strong').textContent.toLowerCase()} en la vida diaria.`;
      } else hint.textContent = 'Selecciona una forma de energía para ver su ejemplo cotidiano.';
    });
  });

  const hours = document.getElementById('hours');
  const hoursValue = document.getElementById('hours-value');
  const kwhValue = document.getElementById('kwh-value');
  const updateMeter = () => { hoursValue.textContent = `${hours.value} h`; kwhValue.textContent = (Number(hours.value) * .15).toFixed(2); };
  hours.addEventListener('input', updateMeter); updateMeter();

  const videoFrame = document.getElementById('project-video');
  const downloadButton = document.getElementById('download-video');
  const directVideo = src => /\.(mp4|webm|ogg|mov)(?:$|[?#])/i.test(src);
  const updateDownload = () => { downloadButton.hidden = !directVideo(videoFrame.src); };
  updateDownload();
  new MutationObserver(updateDownload).observe(videoFrame, {attributes:true, attributeFilter:['src']});
  downloadButton.addEventListener('click', async () => {
    const src = videoFrame.src;
    if (!directVideo(src)) return;
    const filename = decodeURIComponent(new URL(src).pathname.split('/').pop()) || 'video';
    try {
      const response = await fetch(src, {mode:'cors'});
      if (!response.ok) throw new Error('download unavailable');
      const objectUrl = URL.createObjectURL(await response.blob());
      const anchor = document.createElement('a'); anchor.href = objectUrl; anchor.download = filename;
      document.body.append(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch {
      const anchor = document.createElement('a'); anchor.href = src; anchor.download = filename;
      document.body.append(anchor); anchor.click(); anchor.remove();
    }
  });
})();
