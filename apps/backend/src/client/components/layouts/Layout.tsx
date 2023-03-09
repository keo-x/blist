export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section id="main-layout" className="w-full">
      <main className="container mx-auto p-8">{children}</main>
    </section>
  )
}
