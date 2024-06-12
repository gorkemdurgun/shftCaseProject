import {useTranslation} from 'react-i18next';
import {Text, TextProps} from 'react-native';

type TranslatedTextProps = TextProps & {
  text: string;
  className?: string;
};

export default function TranslatedText({className, text}: TranslatedTextProps) {
  const {t} = useTranslation();

  return <Text className={className}>{t(text)}</Text>;
}
