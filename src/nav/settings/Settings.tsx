import Divider from '@/src/components/layout/Divider';
import { useCurrentTheme } from '_store/hooks';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SettingsRouteProps, SettingsRoute } from './SettingsRoutes';

type SettingsType = {
    name: string;
    nav: keyof SettingsRoute;
    icon: (props: any) => React.ReactNode;
};

const settings: SettingsType[] = [
    {
        name: "Theme",
        nav: "Theme",
        icon: (props: any) => <Ionicons name="color-palette-sharp" {...props} />
    },
    {
        name: "Import",
        nav: "Import",
        icon: (props: any) => <AntDesign name="download" {...props} />
    },
    {
        name: "Export",
        nav: "Export",
        icon: (props: any) => <AntDesign name="upload" {...props} />
    },
];

export default function Settings({ navigation }: SettingsRouteProps<'Settings'>) {
    const theme = useCurrentTheme();

    const renderSettingTab = ({ item: setting }: { item: SettingsType; }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(setting.nav)} style={styles.item}>
                {setting.icon({
                    size: 30,
                    color: theme.primary.text,
                })}
                <Text style={[styles.itemText, { color: theme.primary.text }]}>{setting.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={settings}
            renderItem={renderSettingTab}
            keyExtractor={(item: SettingsType) => item.name}
            ItemSeparatorComponent={() => <Divider color={theme.primary.text} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        paddingVertical: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    itemText: {
        paddingLeft: 10,
        fontSize: 20
    },
});
