case "$1" in
    dev)
        docker build -t registry.cn-hangzhou.aliyuncs.com/goldtraffic/gttraffic-ui:dev .
        docker push registry.cn-hangzhou.aliyuncs.com/goldtraffic/gttraffic-ui:dev
        ;;
    test)
        docker build -f ./Dockerfile.test -t registry.cn-hangzhou.aliyuncs.com/goldtraffic/gttraffic-ui:test .
        docker push registry.cn-hangzhou.aliyuncs.com/goldtraffic/gttraffic-ui:test
        ;;
esac

echo '...build and push image okay. delete invaild images...'

docker ps -a | awk '{print $1}' | xargs docker rm
docker images | grep none | awk '{print $3}' | xargs docker rmi

exit 0
