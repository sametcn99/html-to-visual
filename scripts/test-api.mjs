async function testRender() {
  console.log('Testing PNG render...');
  const resPng = await fetch('http://localhost:3000/api/render?json=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: '<div style="background:#6366f1;color:white;padding:30px;font-family:sans-serif;"><h1>PNG API Render</h1></div>',
      format: 'png',
      width: 600,
      height: 300,
    }),
  });

  const dataPng = await resPng.json();
  console.log('PNG Result:', {
    success: dataPng.success,
    format: dataPng.format,
    sizeBytes: dataPng.sizeBytes,
    dataUrlPrefix: dataPng.dataUrl?.substring(0, 30),
  });

  console.log('\nTesting Animated MP4 video render (1.5s @ 24fps)...');
  const resMp4 = await fetch('http://localhost:3000/api/render?json=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: `<html><body style="margin:0;background:#0f172a;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:120px;height:120px;background:#a855f7;border-radius:20px;animation:spin 1.5s infinite linear;"></div>
        <style>@keyframes spin { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }</style>
      </body></html>`,
      format: 'mp4',
      width: 400,
      height: 400,
      duration: 1.5,
      fps: 24,
    }),
  });

  const dataMp4 = await resMp4.json();
  console.log('MP4 Result:', {
    success: dataMp4.success,
    format: dataMp4.format,
    sizeBytes: dataMp4.sizeBytes,
    duration: dataMp4.duration,
    fps: dataMp4.fps,
    dataUrlPrefix: dataMp4.dataUrl?.substring(0, 30),
  });

  console.log('\nTesting Animated GIF render with palettegen (1.0s @ 20fps)...');
  const resGif = await fetch('http://localhost:3000/api/render?json=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: `<html><body style="margin:0;background:#111;display:flex;align-items:center;justify-content:center;height:100vh;">
        <h1 style="color:#10b981;animation:fade 1s infinite alternate;">Glowing GIF</h1>
        <style>@keyframes fade { from{opacity:0.2;} to{opacity:1;} }</style>
      </body></html>`,
      format: 'gif',
      width: 400,
      height: 200,
      duration: 1.0,
      fps: 20,
    }),
  });

  const dataGif = await resGif.json();
  console.log('GIF Result:', {
    success: dataGif.success,
    format: dataGif.format,
    sizeBytes: dataGif.sizeBytes,
    duration: dataGif.duration,
    fps: dataGif.fps,
    dataUrlPrefix: dataGif.dataUrl?.substring(0, 30),
  });
}

testRender().catch(console.error);
