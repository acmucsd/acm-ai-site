import NoticePage from '../../components/NoticePage';

/**
 * Shown to everyone except admins while a site is Admin Only.
 */
export default function ComingSoon() {
  return (
    <NoticePage
      title={<>Coming <span className="colorful">soon</span></>}
      text="This competition isn't open yet, but it will be soon! Keep in touch with us to hear when it launches."
    />
  );
}
