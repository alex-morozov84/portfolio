import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Alexander Morozov — Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #fff 0%, #a78bfa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 16,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Alexander Morozov
          </h1>
          <p
            style={{
              fontSize: 36,
              background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 500,
              marginBottom: 40,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Full-Stack Developer
          </p>

          {/* Tech stack */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'NestJS', 'PostgreSQL'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '8px 20px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: 20,
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#a78bfa',
                    fontSize: 20,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        {/* Domain */}
        <p
          style={{
            position: 'absolute',
            bottom: 40,
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 24,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          alex-morozov.com
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
