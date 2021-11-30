<script>
    import { tagGroups } from "../store/tagGroups";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import notifications from "../store/notifications";

    // Decoding base64 ⇢ UTF8

    function b64DecodeUnicode(str) {
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(str), function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
    }

    onMount(() => {
        try {
            const url = new URL(window.location.href);
            const data = url.searchParams.get("data");

            const group = JSON.parse(b64DecodeUnicode(data));

            tagGroups.update((groups) => {
                console.log(group, groups);
                return groups.find((g) => g.id === group.id)
                    ? groups
                    : [group, ...groups];
            });

            notifications.addNotification(
                `Imported tag group "${group.name}"`,
                "blue"
            );
        } catch {
            notifications.addNotification(
                `Tag group import failed`
            );
        }

        navigate("/", { replace: true });
    });
</script>
