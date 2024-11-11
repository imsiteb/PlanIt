/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() { // функция для запуска приложения по адресу /i
    return [
      {
        source: '/',
        destination: '/i',
        permanent: true, // Устанавливает постоянное перенаправление (301)
      },
    ];
  },  
};

export default nextConfig;
