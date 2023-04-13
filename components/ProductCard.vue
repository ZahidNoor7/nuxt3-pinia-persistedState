<template>
    <!-- <NuxtLink to="/:123"> -->
    <a-card hoverable style="width: 240px">
        <template #cover>
            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
        </a-card-meta>
    </a-card>
    <!-- </NuxtLink> -->

    <div>
        <a-button type="primary" danger>Primary</a-button>
        <a-button danger>Default</a-button>
        <a-button type="dashed" danger>Dashed</a-button>
        <a-button type="text" danger>Text</a-button>
        <a-button type="link" danger>Link</a-button>
    </div>
</template>

<script lang="ts">
import { Button, Card, CardMeta } from 'ant-design-vue';

const ButtonGroup = Button.Group;

export default {
    components: {
        AButton: Button,
        AButtonGroup: ButtonGroup,
        ACard: Card,
        ACardMeta: CardMeta
    },
};
</script>
